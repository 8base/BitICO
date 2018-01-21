import Token from "../data/models/Token";

const createToken = async (req, res) => {
//    console.log("req.user = ", req.user);
//  console.log("req.body = ", req.body);

  const { user } = req;
  // console.log("user = ", user);

  try {
    await user.createToken(req.body);

    res.json({
      success: true
    });
  } catch (e) {
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
    order: [["tokenName", "ASC"]]
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

  console.log("tokenId = ", tokenId, "amount = ", amount);

  const token = await Token.findById(tokenId);

  try {
    await req.user.addPurchase(token);
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

export { createToken, allTokens, myTokens, tokenById, purchaseToken }
