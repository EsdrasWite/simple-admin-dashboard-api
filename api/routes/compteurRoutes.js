import express from "express";

const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json({
        message: "compteur created"
    })
});

router.get('/', (req, res)=>{
    res.status(200).json({
        message:"compteur retreived",
        
    })
})

export default router;