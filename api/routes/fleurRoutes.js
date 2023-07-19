import express from 'express';
const router = express.Router();

router.post('/', (req, res)=>{
    res.status(200).json({
        message:'Fleur poster'
    })
});

router.get('/', (req, res)=>{
    res.status(200).json({
        message:'Fleur retreived'
    })
})

export default router;