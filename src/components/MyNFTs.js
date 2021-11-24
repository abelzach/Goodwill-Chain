import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

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


class MyNFTs extends Component {

    constructor(props) {
        super(props);
        this.priceinput = React.createRef();
    }

    render() {
        const {classes} = this.props;

        return (
          <React.Fragment>
            <br/><br/>
            <Typography component="h1" variant="h2" align="center" color="Secondary"  gutterBottom>
                <WhiteTextTypography variant="h2"  >
                    Your NFTs
                </WhiteTextTypography>
            </Typography>
            <br /><br/>
            <center>
            <div className={classes.root}>
            <Grid>
                <br/><br/>
                <div style={{ width: 800 }}>
                { this.props.mynfts.map((nft, key) => {
                  return(
                    <React.Fragment>
                        <div class="coupon" key={key} >
                        <div className="card-header">
                        <h2 style={{color: "cornflowerblue"}}>{nft.name}</h2>
                        </div>
                        <ul id="postList" className="list-group list-group-flush">
                            <li key={key} className="list-group-item py-2">
                            <br></br>
                            <audio controls>
                                <source src={`https://${nft.filecid}.ipfs.dweb.link`} type="" />
                            </audio>
                            </li>
                            <br/><br/>
                            { nft.isListed &&
                            <React.Fragment>
                                <div class="form-group mx-sm-5 mb-2">
                                    <h4 style={{color: "white"}}>Listed in auction for {window.web3.utils.fromWei(nft.price.toString())} CELO</h4>
                                </div>
                            </React.Fragment>
                            }
                        </ul>
                        </div>
                        <p>&nbsp;&nbsp;</p>
                    </React.Fragment>
                  )
                })}
                </div>
            </Grid>
            </div>
            </center>
        </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(MyNFTs);
