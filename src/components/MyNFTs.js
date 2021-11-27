import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';

class MyNFTs extends Component {
    render() {
        return (
          <React.Fragment>
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Your NFTs</h1>
                        {this.props.mynfts.map((nft, key) => {
                            return (
                                <Card key={key}>
                                    <Card.Body>
                                        <Card.Title>{nft.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">NFT ID: {nft.id.toString()}</Card.Subtitle>
                                        <img src={`https://${nft.filecid}.ipfs.dweb.link`} height="250" width="350" alt="NFT image" />
                                        <br /> <br/>
                                        <Card.Subtitle className="mb-2 text-muted">Author: {nft.owner}</Card.Subtitle>
                                        <br />
                                        <Card.Subtitle className="mb-2 text-muted">Price bought for: {window.web3.utils.fromWei(nft.price.toString(), 'Ether')} CELO</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </main>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default MyNFTs;
