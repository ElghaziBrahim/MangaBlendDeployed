const communityModule = require("../modules/communityModule")

async function getCommunityBySlug(req, res) {
    const slug_community = req.params.slug
    try {
        const community = await communityModule.findOne({ slug: slug_community })
        res.send(community)
    } catch (error) {
        console.error("Error fetching community:", error);
    }


}
async function getCommunitiesBySearch(req, res) {
    const searchKey = req.params.key;
    try {
        if (searchKey == 'all') {
            const communities = await communityModule.find();
            res.send(communities);
        } else {
            const communities = await communityModule.find({
                $or: [
                    { name: { $regex: searchKey, $options: 'i' } }, // Case-insensitive name search
                    { description: { $regex: searchKey, $options: 'i' } } // Case-insensitive description search
                ]
            });
            res.send(communities);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}



module.exports = { getCommunityBySlug, getCommunitiesBySearch }