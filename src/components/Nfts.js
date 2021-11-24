import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const useStyles = ({
    root: {
      flexGrow: 1,
      //padding: theme.spacing(2)
    }
});

const WhiteTextTypography = withStyles({
  root: {
    color: "white"
  }
})(Typography);


class Nfts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }

    render() {

        let filterednfts = this.props.nfts.filter((nft) => {
              return nft.name.indexOf(this.state.search) !== -1;
            }
        );

        return (
          <React.Fragment>
            <br/><br/>
            <Typography component="h1" variant="h2" align="center" color="Secondary"  gutterBottom>
                <WhiteTextTypography variant="h2"  >
                    View nfts
                </WhiteTextTypography>
            </Typography>
            <br /><br/>
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Purchase Literary nfts NFTs</h1>
                        <br />
                        <input placeholder="Enter title to search" style={{ width: '80%', margin: 'auto' }} type="text" class="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                        <p>&nbsp;</p>
                            {filterednfts.map((nft, key) => {
                                console.log(key.filecid);
                            return (
                                <Card key={key}>
                                    <Card.Body>
                                        <Card.Title>{nft.title}</Card.Title>
                                        
                                        <img src={`https://${key.filecid}.ipfs.dweb.link`} height="250" width="350" alt="NFT image" />
        
                                        <Card.Subtitle className="mb-2 text-muted">Author: {nft.owner}</Card.Subtitle>
                                        <br />
                                        <Card.Subtitle className="mb-2 text-muted">Price: {window.web3.utils.fromWei(nft.price.toString(), 'Ether')} CELO</Card.Subtitle>
                                        <Button
                                            variant='primary'
                                            name={nft.id}
                                            onClick={(event) => {
                                            this.props.buyNFT(event.target.name, window.web3.utils.fromWei(nft.price.toString(), 'Ether'))
                                            }}>
                                            Purchase NFT
                                        </Button>
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
export default Nfts;
