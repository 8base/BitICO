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


const createToken = (req, res) => {
//    console.log("req.user = ", req.user);
  console.log("req.body = ", req.body);

  res.json({
    success: true
  });
};


const allTokens = (req, res) => {
//    console.log("req.user = ", req.user);
  console.log("req.body = ", req.body);

  res.json({
    success: true
  });
};

export { createToken, allTokens }
