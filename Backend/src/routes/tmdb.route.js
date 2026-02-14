import { Router } from "express";
import { getChinese, getGenre, getJapanese, getKorean, getSearch, getTopRated, getTrending, getUpcoming, getWestern } from "../controllers/tmdb.controller.js";

const router = Router()

router.route('/search').post(getSearch)
router.route('/genre').post(getGenre)
router.route('/top-rated').get(getTopRated)
router.route('/upcoming').get(getUpcoming)
router.route('/trending').get(getTrending)
router.route('/korean').get(getKorean)
router.route('/japanese').get(getJapanese)
router.route('/chinese').get(getChinese)
router.route('/western').get(getWestern)

export default router;