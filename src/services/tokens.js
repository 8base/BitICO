/*
export default {


  createTokenPost: (req, res) => {
//    console.log("req.user = ", req.user);
    console.log("req.body = ", req.body);

    res.json({
      success: true
    });
  }


}
*/


const createToken = async (req, res) => {
//    console.log("req.user = ", req.user);
  console.log("req.body = ", req.body);

  const { user } = req;

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


const allTokens = (req, res) => {
//    console.log("req.user = ", req.user);
  console.log("req.body = ", req.body);

  res.json({
    success: true
  });
};

export { createToken, allTokens }
