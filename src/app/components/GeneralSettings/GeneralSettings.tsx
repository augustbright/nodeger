import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, Code, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Switch, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useSettings } from "../../hooks/useSettings";
import { useIPCStatus } from "../../hooks/useIPCStatus";
import { useQueryClient } from "react-query";
import { API } from "../../../shared/const";

export const GeneralSettings = () => {
    const { data: settings } = useSettings();
    const queryClient = useQueryClient();
    const { reloadNVM } = useIPCStatus();
    const toast = useToast();
    if (!settings) { return null; }

    return (
        <Formik<TSettings>
            initialValues={settings}
            onSubmit={(values, actions) => {
                api.settings.set(values).then((response) => {
                    if (response.error) {
                        toast({
                            description: response.error,
                            status: 'error',
                            title: 'Error saving settings'
                        });
                    } else {
                        toast({
                            description: 'Settings saved',
                            status: 'success',
                        });
                    }
                    reloadNVM();
                    queryClient.invalidateQueries(API.SETTINGS.GET);
                    actions.setSubmitting(false);
                    actions.resetForm({ values });
                })
            }}
            validateOnMount
            validateOnChange
            validate={api.settings.validate}
        >
            {(props) => (
                <Form>
                    <Flex direction='column' gap={4}>
                        <FormControl isInvalid={!!props.errors.nvmPath && !!props.touched.nvmPath}>
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

                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='debugMode' mb='0'>
                                Enable debug mode
                            </FormLabel>
                            <Switch size='md' id='debugMode' {...props.getFieldProps('debugMode')} isChecked={props.values.debugMode} />
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
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};