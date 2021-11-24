import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import Card from 'react-bootstrap/Card';
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "white"
  }
})(Typography);


class MyNFTs extends Component {

    render() {
        return (
          <React.Fragment>
            <br/><br/>
            <Typography component="h1" variant="h2" align="center" color="Secondary"  gutterBottom>
                <WhiteTextTypography variant="h2"  >
                    Your NFTs
                </WhiteTextTypography>
            </Typography>
            <br /><br/>
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Your NFTs</h1>
                        <br />
                        {this.props.mynfts.map((nft, key) => {
                            return (
                                <Card key={key}>
                                    <Card.Body>
                                        <Card.Title>{nft.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">NFT ID: {nft.id.toString()}</Card.Subtitle>
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
