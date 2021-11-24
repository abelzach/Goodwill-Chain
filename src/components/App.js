import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home.js";
import Navbar from "./Navbar.js";
import Register from "./Register.js";
import Nfts from "./Nfts.js";
import { SpringSpinner } from 'react-epic-spinners';
import Web3 from 'web3';
import GoodwillChain from '../build/GoodwillChain.json';
import Create from './create.js';
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
        const networkId = await web3.eth.net.getId();
        const networkData = GoodwillChain.networks[networkId];

        if (networkData) {
            const goodwillChain = new web3.eth.Contract(GoodwillChain.abi, networkData.address);
            this.setState({ goodwillChain });
            const tCount = await goodwillChain.methods.tCount.call();
            for (let i = 1; i <= tCount; i++) {
                const nft = await goodwillChain.methods.nfts(i).call();
                this.setState({
                    nfts: [...this.state.nfts, nft]
                });
                if (nft.owner == this.state.account) {
                    this.setState({
                        mynfts: [...this.state.mynfts, nft]
                    });
                }
            }
            this.setState({ loading: false });
        } else {
            window.alert('Contract could not be deployed.');
        }
    }

    createNFT(name, filecid, price) {
        this.setState({ loading: true });
        this.state.goodwillChain.methods.createNFT(name, filecid, price).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
            })
    }

    registerArtist(name) {
        this.setState({ loading: true });
        this.state.goodwillChain.methods.registerArtist(name).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
            })
    }

    setOrgAddress(org_address) {
        this.setState({ loading: true });
        this.state.goodwillChain.methods.setOrgAddress(org_address).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
            })
    }

    buyNFT(id) {
        this.setState({ loading: true });
        this.state.goodwillChain.methods.buyNFT(id).send({ from: this.state.account })
            .once('confirmation', (n, receipt) => {
                this.setState({ loading: false });
                window.location.reload();
            })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            goodwillChain: null,
            nfts: [],
            mynfts: [],
            loading: false
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
                        <Home />
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
                        : <Create createTrack={this.createNFT} />
                    }
                    </React.Fragment>
                )} />    

                <Route exact path="/nfts" render={props => (
                    <React.Fragment>
                    {
                        this.state.loading
                        ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                    :<Nfts tracks={this.buyNFT} />
                    }
                    </React.Fragment>
                )} />  

                {/* <Route exact path="/mytracks" render={props => (
                    <React.Fragment>
                    {
                        this.state.loading
                        ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                        :<Mytracks mytracks={this.state.mytracks} setPrice={this.setPrice} />
                    }
                    </React.Fragment>
                )} /> */}

                </Router>                
            </div>
            </>
        );
    }
}

export default App;
