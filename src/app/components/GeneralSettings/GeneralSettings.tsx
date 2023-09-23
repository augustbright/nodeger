import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Code, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useSettings } from "../../hooks/useSettings";
import { toast } from "react-toastify";
import { useIPCStatus } from "../../hooks/useIPCStatus";

export const GeneralSettings = () => {
    const {settings, reloadSettings} = useSettings();
    const { reloadNVM } = useIPCStatus();
    return (
        <Formik<TSettings>
            initialValues={settings}
            onSubmit={(values, actions) => {
                api.settings.set(values).then((response) => {
                    if (response.error) {
                        toast.error(response.error);
                    } else {
                        toast.success('Settings saved');
                    }
                    reloadNVM();
                    reloadSettings();
                    actions.setSubmitting(false);
                })
            }}
            validateOnMount
            validateOnChange
            validate={api.settings.validate}
        >
            {(props) => (
                <Form>
                    <FormControl isInvalid={props.errors.nvmPath && props.touched.nvmPath}>
                        <FormLabel>NVM path</FormLabel>
                        <InputGroup>
                            <Input {...props.getFieldProps('nvmPath')} type='text' />
                            {!props.isSubmitting && props.values.nvmPath && !props.errors.nvmPath && (
                                <InputRightElement>
                                    <CheckIcon color='green.500' />
                                </InputRightElement>
                            )}

                            {!props.isSubmitting && props.values.nvmPath && props.errors.nvmPath && (
                                <InputRightElement>
                                    <WarningIcon color='red.500' />
                                </InputRightElement>
                            )}
                        </InputGroup>
                        <FormErrorMessage>{props.errors.nvmPath}</FormErrorMessage>
                        <FormHelperText>Path to the nvm shell script, e.g. <Code>/Users/username/.nvm/nvm.sh</Code></FormHelperText>
                    </FormControl>

                    <Flex justifyContent='flex-end'>
                        <Button
                            colorScheme={props.dirty ? 'teal' : 'gray'}
                            isLoading={props.isSubmitting}
                            variant={props.dirty ? 'solid' : 'outline'}
                            type={'submit'}
                            isDisabled={!props.dirty}
                        >
                            {props.dirty ? 'Save' : 'Saved'}
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};