import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@material-ui/core';

export default class BasePage extends React.Component {
    public render() : JSX.Element {
        return (
            <Container>
                <Navbar />
            </Container>
        );
    }
}