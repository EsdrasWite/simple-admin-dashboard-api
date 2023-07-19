import express from "express";

const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json({
        message: "user created"
    })
});

router.get('/', (req, res)=>{
    res.status(200).json({
        message:"User retreived",
        
    })
})

export default router;