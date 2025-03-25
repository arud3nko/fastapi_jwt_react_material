import { Button, Grid2 as Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

type LoginPageProps = {
    onSubmit: (username: string, password: string) => void;
};

const LoginPage = ({ onSubmit }: LoginPageProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(username, password);
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
                <h1>Welcome!</h1>
                <TextField
                    required
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    type="password"
                    required
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Log in
                </Button>
            </Grid>
        </form>
    );
};

export default LoginPage;
