import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home.js";
import Navbar from "./Navbar.js";
import Register from "./Register.js";
import Nfts from "./Nfts.js";
import { SpringSpinner } from 'react-epic-spinners';
import Web3 from 'web3';
import GoodwillChainMain from '../build/GoodwillChainMain.json';
import Create from './create.js';
import MyNFTs from './MyNFTs.js';
class App extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    async loadWeb3() {
        if (window.celo) {
            await window.celo.enable();
            window.web3 = new Web3(window.celo);
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Use the Celo Extension Wallet!');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        const GCMain = new web3.eth.Contract(GoodwillChainMain.abi, "0x34e1574689Db3bCC0eAE0d269d1Fc535D125AF94");
        this.setState({ GCMain });
        const tCount = await GCMain.methods.tCount.call();
        for (let i = 1; i <= tCount; i++) {
            const nft = await GCMain.methods.nfts(i).call();
            this.setState({
                nfts: [...this.state.nfts, nft]
            });
            if (nft.owner === this.state.account) {
                this.setState({
                    mynfts: [...this.state.mynfts, nft]
                });
            }
        }
        const orgB = await window.web3.eth.getBalance("0x1293D54725Cb3A5C8573dc9cd0E090544B1a3466");
        const orgBalance = window.web3.utils.fromWei(orgB.toString());
        this.setState({ orgBalance });
        this.setState({ loading: false });
        
    }

    createNFT(name, filecid, price) {
        this.setState({ loading: true });
        this.state.GCMain.methods.createNFT(name, filecid, window.web3.utils.toWei(price.toString())).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.href = '/nfts'
            })
    }

    registerArtist(name) {
        this.setState({ loading: true });
        this.state.GCMain.methods.registerArtist(name).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
            })
    }

    setOrgAddress(org_address) {
        this.setState({ loading: true });
        this.state.GCMain.methods.setOrgAddress(org_address).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
            })
    }

    buyNFT(id,price) {
        this.setState({ loading: true });
        this.state.GCMain.methods.buyNFT(id).send({ from: this.state.account, value: window.web3.utils.toWei(price.toString()) })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
                window.location.href = '/mynfts'
            })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            GCMain: null,
            nfts: [],
            mynfts: [],
            loading: false,
            orgBalance: 0
        }

        this.registerArtist = this.registerArtist.bind(this);
        this.setOrgAddress = this.setOrgAddress.bind(this);
        this.createNFT = this.createNFT.bind(this);
        this.buyNFT = this.buyNFT.bind(this);
    }

    render() {
        return (
            <>
            <div>
            <Router>
                <Navbar />

                <Route exact path="/" render={props => (
                    <React.Fragment>
                        {
                            <Home orgBalance={this.state.orgBalance}/>
                        }
                    </React.Fragment>
                )} />

                <Route exact path="/register" render={props => (
                    <React.Fragment>
                    {
                        this.state.loading
                        ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                        : <Register registerArtist={this.registerArtist} />
                    }
                    </React.Fragment>
                )} />

                <Route exact path="/create" render={props => (
                    <React.Fragment>
                    {
                        this.state.loading
                        ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                        : <Create createNFT={this.createNFT} />
                    }
                    </React.Fragment>
                )} />

                <Route exact path="/nfts" render={props => (
                    <React.Fragment>
                    {
                        this.state.loading
                        ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                    :<Nfts nfts={this.state.nfts} buyNFT={this.buyNFT} />
                    }
                    </React.Fragment>
                )} />

                <Route exact path="/mynfts" render={props => (
                    <React.Fragment>
                    {
                        this.state.loading
                        ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                    :<MyNFTs mynfts={this.state.mynfts}/>
                    }
                    </React.Fragment>
                )} />


                </Router>
            </div>
            </>
        );
    }
}

export default App;
