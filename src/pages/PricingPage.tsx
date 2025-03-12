import React from 'react';
import {Card, CardContent, CardActions, Typography, Button, Container, Box} from '@mui/material';
import logo from "../assets/logo.png";
import {Link} from "react-router";

const PricingPage: React.FC = () => {
    return (
        <div className="pricing-container">
            <header className="header">
                <div className="logo-container">
                    <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="nav-buttons">
                    <Link to="/login" className="nav-button">log in</Link>
                    <Link to="/signup" className="nav-button">sign up</Link>
                </div>
            </header>

            <main className="pricing-main">
                <h1 className="pricing-title">Pricing</h1>
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3}>
                        <Card className="pricing-card" sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Subscribe</Typography>
                                <Typography variant="h6">$0/month</Typography>
                                <Typography variant="body2">
                                    - Basic interview questions <br />
                                    - Limited coaching feedback <br />
                                    - Limited Quiz
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to="/" className="nav-button">Subscribe</Link> //todo should navigates to checkout
                            </CardActions>
                        </Card>

                        <Card className="pricing-card" sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Educational Plan</Typography>
                                <Typography variant="h6">$10/month</Typography>
                                <Typography variant="body2">
                                    - Everything in Free <br />
                                    - Personalized feedback <br />
                                    - Unlimited Quiz <br />
                                    - Mock interviews
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" fullWidth>Subscribe</Button>
                            </CardActions>
                        </Card>

                        <Card className="pricing-card" sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Pro Plan</Typography>
                                <Typography variant="h6">$20/month</Typography>
                                <Typography variant="body2">
                                    - Everything in Educational <br />
                                    - Priority support <br />
                                    - Advanced interview scenarios <br />
                                    - Resume and cover letter reviews
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" fullWidth>Subscribe</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default PricingPage;
