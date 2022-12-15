import {
    Button,
    Center,
    Paper,
    Title,
    TextInput,
    PasswordInput,
    Progress,
    Text,
    Box,
    Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '../styles/Login.module.scss';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            size="sm">
            {meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /(?=.*[a-z])(?=.*[A-Z])/, label: 'Includes a mix of uppercase and lowercase letters' },
    { re: /[0-9$&+,:;=?@#|'<>.^*()%!-]+/, label: 'Includes one or more number or symbol' },
];

function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate: {
            name: (value) => (/^[A-Za-z]+$/.test(value) ? null : 'Invalid name'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9$&+,:;=?@#|'<>.^*()%!-])/.test(value)
                    ? null
                    : 'Invalid password',
        },
    });
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(form.values.password)}
        />
    ));

    const strength = getStrength(form.values.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const onSubmit = (values: any) => {
        setIsLoading(true);
        showNotification({
            title: `Welcome to GIFT.ed, ${values.name}!`,
            message: "You'll be redirected once this notification closes.",
            onClose: () => router.push('/home'),
        });
    };

    return (
        <Center className={styles.container}>
            <Paper shadow="xs" radius="md" p={40}>
                <Center>
                    <Image
                        width={50}
                        height={50}
                        src="/assets/images/logo.jpeg"
                        alt="GIFT.ed Logo"
                    />
                </Center>
                <Title order={3} mt={20} align="center">
                    Create your account
                </Title>

                <form data-testid="login-form" onSubmit={form.onSubmit(onSubmit)}>
                    <Stack mt={20} mb={25}>
                        <TextInput
                            data-testid="name"
                            label="Full name"
                            {...form.getInputProps('name')}
                        />

                        <TextInput
                            data-testid="email"
                            label="Email"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            data-testid="password"
                            label="Password"
                            {...form.getInputProps('password')}
                        />

                        <Box>
                            <Text size="xs">Password strength</Text>
                            <Progress color={color} value={strength} size={10} mb={10} />
                            <PasswordRequirement
                                label="Minimum 8 characters"
                                meets={form.values.password.length > 7}
                            />
                            {checks}
                        </Box>
                    </Stack>

                    <Button type="submit" color="red" radius="xl" loading={isLoading} fullWidth>
                        CONTINUE
                    </Button>
                </form>
            </Paper>
        </Center>
    );
}
