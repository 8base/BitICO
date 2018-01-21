import Token from "../data/models/Token";
import RSKService from "./RSKService";
import BTCService from "./BTCService";

const createToken = async (req, res) => {
//    console.log("req.user = ", req.user);
//  console.log("req.body = ", req.body);

  const { user, body } = req;
  // console.log("user = ", user);

  try {

    const now = new Date();

    console.log("user.rskAddress = ", user.rskAddress);
    const rskService = new RSKService(user.rskAddress);
    console.log("rskService done");
    body.softCap = 0.00001;
    body.hardCap = 0.0001;
    const crowdsaleInstance = await rskService.deployCrowdsale({
      tokenName: body.tokenName,
      tokenSymbol: body.tokenTicker,
      startTime: new Date(now.getTime() + 60 * 1000),
      endTime: new Date(body.fundEndDate * 1000),
      rate: body.rate,
      goal: body.softCap,
      cap: body.hardCap,
      wallet: user.rskAddress,
      onSent: (contract) => {
        console.log("Contract sent");
      },
    });
    console.log('CrowdsaleRskAddress: ', crowdsaleInstance.address);
    console.log('TokenRskAddress: ', rskService.token.address);


    await user.createToken({
      ...body,
      crowdsaleRskAddress: crowdsaleInstance.address,
      tokenRskAddress: rskService.token.address
    });

    res.json({
      success: true
    });
  } catch (e) {

    console.log("e = ", e);
    let  { message } = e;
    if (e.name === "SequelizeUniqueConstraintError" && e.errors.length > 0) {
      const field = e.errors[0].path;
      if (field === "tokenName") {
        message = "Token name should be unique"
      }
      if (field === "tokenTicker") {
        message = "Token Ticker should be unique"
      }
    }

    res.status(403);
    res.json({
      success: false,
      message
    });
  }

};


const allTokens = async (req, res) => {
  const tokens = await Token.findAll({
    order: [["createdAt", "DESC"]]
  });

  res.json({
    success: true,
    data: tokens
  });
};


const myTokens = async (req, res) => {
  const tokens = await req.user.getTokens({
    order: [["tokenName", "ASC"]]
  });

  res.json({
    success: true,
    data: tokens
  });
};

const tokenById = async (req, res) => {
  const { tokenId } = req.params;

  console.log("tokenId = ", tokenId);

  const token = await Token.findById(tokenId);

  res.json({
    success: true,
    data: token
  });
};


const purchaseToken = async (req, res) => {
  const { tokenId, amount } = req.params;
  const { user } = req;

  console.log("tokenId = ", tokenId, "amount = ", amount);

  const token = await Token.findById(tokenId);

  try {
    await req.user.addPurchase(token);
    const rskService = new RSKService(user.rskAddress);
    const btcService = new BTCService();

    rskService.loadCrowdsaleAt(token.crowdsaleRskAddress);
    await btcService.buyTokens(user.btcAddress, user.rskAddress, amount, rskService);

  } catch ( e ) {
    console.log("e = ", e);
  }



  /*
    const token = await Token.findById(tokenId);

    res.json({
      success: true,
      data: token
    });
  */

  res.json({
    success: true,
  });

};

const fetchBalance = async (req, res) => {
  const { tokenId } = req.params;
  const { user } = req;
  const rskService = new RSKService(user.rskAddress);

  const token = await Token.findById(tokenId);

  rskService.loadCrowdsaleAt(token.crowdsaleRskAddress);

  const result = rskService.tokenBalance(user.rskAddress);

  res.json({
    success: true,
    data: result
  });

};


const fetchBtcBalance = async (req, res) => {
  const { user } = req;

  const btcService = new BTCService();

  const result = btcService.getBalance(user.btcAddress, 0);

  res.json({
    success: true,
    data: result
  });

};



export { createToken, allTokens, myTokens, tokenById, purchaseToken, fetchBalance, fetchBtcBalance
}
