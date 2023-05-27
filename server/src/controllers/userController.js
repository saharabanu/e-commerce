


  const getUsers =  (req, res, next) => {
   try {
    res.status(200).json({
        message:'All Users here',
     
        
      });
    
   } catch (error) {
    next(error)
    
   }
  }



  const postUser = (req, res,next) => {
   try {
    res.status(200).json({
        message:'Welcome to E-commerce project server, post api is working fine',
       
      })
    
   } catch (error) {
    next(error)
   }
  
  }




  const deleteUser = (req, res,next) => {
    try {
        res.status(200).json({
            message: "Welcome to E-commerce project server, delete api is working fine",
          });
    } catch (error) {
        next(error)
    }
  }


  const updateUser = (req, res, next) => {
   try {
    res.status(200).json({
        message: "Welcome to E-commerce project server, put api is working fine",
      });
   } catch (error) {
    next(error)
   }
  }



module.exports = {getUsers, postUser, deleteUser, updateUser}