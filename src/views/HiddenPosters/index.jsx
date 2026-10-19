import PosterSwiper from 'views/Home/components/PosterSwiper';
import testPosterData from 'views/Posters/dummy-posters/dummyposters';
// This route is a public, direct-link version of the poster carousel.
// It reuses the live poster feed but removes the normal app chrome so the posters can
// be viewed without logging in and without the regular site navigation around them.

const testPosters = testPosterData.map(({key,title, image}) =>(
    {
        ID: key,
        Title: title,
        ImagePath: image,
    }
)
)
const POSTER_source = 'test'

const HiddenPosters = () => {
    const posterOverride = POSTER_source === "test" ? testPosters : undefined;
    return <PosterSwiper showManagementLinks={false} postersOverride={posterOverride}/>;
};

export default HiddenPosters;
