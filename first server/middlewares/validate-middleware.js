import {SignupSchema} from "../validators/auth-validator.js";

export const validate = (SignupSchema) => async (req , res , next) =>{
    try{

        const parseBody = await SignupSchema.parseAsync(req.body);
        req.body = parseBody;
        next();

    }catch(err){
        console.log(err)
        const errMsg = {
            status : 422,
            message: "fill the input properly",
            extraDetails : err.errors[0].message ,
            
        }

        next( errMsg );
    }
}