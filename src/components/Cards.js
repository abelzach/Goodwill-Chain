import React from "react";

function Cards() {
  return (
    <div>
      <section id="description-section">
        <div id="go-here" class="container-fluid">
          <h1>Buy NFTS you want and donate to charity</h1>
          <br />
          <br />
          <br />
          <p>
            Even the smallest of donations can make a big impact.
            NGOs like Save the Children have highly cost-efficient programs,
            which are able to channelise the value of every single rupee towards helping
            the marginalised and impoverished across India. While India has seen rising incomes,
            this has also been matched with rising income inequality. In such times,
            making a difference enables people to feel a mutual sense of hope, fulfilment, and purpose.
          </p>
          <br />
          <br />
          <br />

          <div class="row">
            <div class="col-lg-4 col-md-4">
              <div class="card">
                <div class="card-body">
                  <p>
                    <i class="fas fa-calendar-check fa-2x"></i>
                  </p>

                  <h5 style={{ fontWeight: "bolder" }}>NFT</h5>
                  <p class="card-text">
                    NFTs are seen as a way to have possessions in online and virtual environments,
                    which can communicate social status and personal taste – for some people,
                    it is the digital equivalent of buying an expensive pair of sneakers.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="card">
                <div class="card-body">
                  <p>
                    <i class="fas fa-shopping-cart fa-2x"></i>
                  </p>
                  <h5 style={{ fontWeight: "bolder" }}>Donate</h5>
                  <p class="card-text">
                    Do you desire to help people suffering due to the pandemic?
                    Are you interested in supporting a good cause? Goodwill chain
                    gives you an oppurtunity to donate buy providing you with the NFT's you desire to possess.
                  </p>
                  
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="card">
                <div class="card-body">
                  <p>
                    <i class="fas fa-search fa-2x"></i>
                  </p>
                  <h5 style={{ fontWeight: "bolder" }}>Blockchain</h5>
                  <p class="card-text">
                    Blockchain technology allows NFTs to be publicly authenticated,
                    serving as a digital signature certifying the ownership and originality.
                    NFTs cannot be exchanged for a like-for-like basis as each one is unique in
                    contrast to fungible assets like dollars, stocks or bars of gold.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <h1 style={{ color: "#00917c" }}>Help Donate</h1>
        <br />
        <br />
      </section>
    </div>
  );
}

export default Cards;
