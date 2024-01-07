import { LightningElement,track} from 'lwc';

export default class TrainingVideos extends LightningElement {
    @track videos= [
        { id: '1', title: 'YouTube video player', url: 'https://www.youtube.com/embed/ljZVm63I6SI?si=4lrqdT8plj49uNRF' },
        { id: '2', title: 'YouTube video player', url: 'https://www.youtube.com/embed/jFMA5ggFsXU?si=SpICtbveos-mqkdG' },
        { id: '3', title: 'YouTube video player', url: 'https://www.youtube.com/embed/qOoCIlYxLb4?si=bmWDPnOpqATrwQ6c' },
        { id: '4', title: 'YouTube video player', url: 'https://www.youtube.com/embed/e6g4fQP3h4M?si=m2eSv4LcHo2JCIjT' },
    ];;

    loadDogVideos() {
        this.videos = [
            { id: '1', title: 'YouTube video player', url: 'https://www.youtube.com/embed/ljZVm63I6SI?si=4lrqdT8plj49uNRF' },
            { id: '2', title: 'YouTube video player', url: 'https://www.youtube.com/embed/jFMA5ggFsXU?si=SpICtbveos-mqkdG' },
            { id: '3', title: 'YouTube video player', url: 'https://www.youtube.com/embed/qOoCIlYxLb4?si=bmWDPnOpqATrwQ6c' },
            { id: '4', title: 'YouTube video player', url: 'https://www.youtube.com/embed/e6g4fQP3h4M?si=m2eSv4LcHo2JCIjT' },
        ];
       
    }

    loadCatVideos() {
        this.videos = [
            { id: '1', title: 'YouTube video player', url: 'https://www.youtube.com/embed/2h9VqeC6n50?si=pnKgMHrJrPgP6TkR' },
            { id: '2', title: 'YouTube video player', url: 'https://www.youtube.com/embed/Uu-hRtkaVLc?si=Tr_p-OoOHYKO18bt' },
            { id: '3', title: 'YouTube video player', url: 'https://www.youtube.com/embed/yM3n2mWZqUU?si=A9d32wBNmNbdgZKS' },
            { id: '4', title: 'YouTube video player', url: 'https://www.youtube.com/embed/Xz6yBbBRr8Y?si=wrdwqD5OSMTCuA4Z' },
        ];
    }
}