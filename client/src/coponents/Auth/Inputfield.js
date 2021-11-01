import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function Inputfield({ half, name, label, onChange, type, autoFocus, handelShowPassword }) {
    return (
        <>
            <Grid item xs={12} sm={half ? 6 : 12} >
                <TextField
                    name={name}
                    label={label}
                    onChange={onChange}
                    required
                    variant="outlined"
                    fullWidth
                    autoFocus={autoFocus}
                    type={type}
                    inputProps={
                        name === 'password' ? (
                            <InputAdornment>
                                <IconButton onClick={handelShowPassword} >
                                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                            : ""
                    }
                />
            </Grid>
        </>
    )
}
