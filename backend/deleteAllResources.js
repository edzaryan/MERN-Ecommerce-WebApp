
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: "di5uzdjhs",
    api_key: "225384856699865",
    api_secret: "XffPt5-kNZ9005PdWgofrOi5nHg"
});


const deleteAllResources = async () => {
    try {
        let resources = await cloudinary.api.resources({ max_results: 500 });

        while (resources.resources.length > 0) {
            const publicIds = resources.resources.map(resource => resource.public_id);

            await cloudinary.api.delete_resources(publicIds);

            resources = await cloudinary.api.resources({ max_results: 500 });
        }

        console.log('All resources have been deleted.');
    } catch (error) {
        console.error('Error deleting resources:', error);
    }
};


deleteAllResources();
