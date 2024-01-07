import { LightningElement ,track} from 'lwc';

export default class MarketPlace extends LightningElement {

    @track loggedInUserCookie = this.getCookie('loggedInUser');
    data={
        farm:{
            food:[ {
                id:1,
                name:'apple',
                link:'/sfsites/c/resource/bg'
             
            },{id:2,
                name:'orange',
                link:'/sfsites/c/resource/bg'
            },
            {  id:3,
                name:'Banana',
                link:'/sfsites/c/resource/bg'
            }
    
            ],
    
            shelter :[
             {   id:1,
                name:'1',
                link:'/sfsites/c/resource/bg'
             },
             {   id:2,
                 name:'2',
             link:'/sfsites/c/resource/bg'
            },
            {   id:3,
                name:'3',
            link:'/sfsites/c/resource/bg'
           }
    
            ],
            medicines :[
                {   id:1,
                    name:'Crocin',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:2,
                    name:'Dolo',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:3,
                    name:'digene',
                    link:'/sfsites/c/resource/bg'
                 }
    
            ]
    
            
    
        },
        dog:{
            food:[ {
                id:1,
                name:'Dog-salad',
                link:'/sfsites/c/resource/df1'
             
            },{id:2,
                name:'choco-grains',
                link:'/sfsites/c/resource/df2'
            },
            {  id:3,
                name:'Pedigree',
                link:'/sfsites/c/resource/df3'
            }
    
            ],
    
            shelter :[
             {   id:1,
                name:'White',
                link:'/sfsites/c/resource/ds1'
             },
             {   id:2,
                 name:'Brown',
             link:'/sfsites/c/resource/ds2'
            },
            {   id:3,
                name:'Grey',
            link:'/sfsites/c/resource/ds3'
           }
    
            ],
            medicines :[
                {   id:1,
                    name:'Calming Bites',
                    link:'/sfsites/c/resource/dm1'
                 },
                 {  id:2,
                    name:'Dog Pain Away',
                    link:'/sfsites/c/resource/dm2'
                 },
                 {  id:3,
                    name:'safe guard',
                    link:'/sfsites/c/resource/dm3'
                 }
    
            ]
    
            
    
        },
        cat:{
            food:[ {
                id:1,
                name:'dog',
                link:'/sfsites/c/resource/bg'
             
            },{id:2,
                name:'dog',
                link:'/sfsites/c/resource/bg'
            },
            {  id:3,
                name:'Banana',
                link:'/sfsites/c/resource/bg'
            }
    
            ],
    
            shelter :[
             {   id:1,
                name:'dog',
                link:'/sfsites/c/resource/bg'
             },
             {   id:2,
                 name:'2',
             link:'/sfsites/c/resource/bg'
            },
            {   id:3,
                name:'3',
            link:'/sfsites/c/resource/bg'
           }
    
            ],
            medicines :[
                {   id:1,
                    name:'dog',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:2,
                    name:'Dolo',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:3,
                    name:'digene',
                    link:'/sfsites/c/resource/bg'
                 }
    
            ]
    
            
    
        },
        fish:{
            food:[ {
                id:1,
                name:'dog',
                link:'/sfsites/c/resource/bg'
             
            },{id:2,
                name:'dog',
                link:'/sfsites/c/resource/bg'
            },
            {  id:3,
                name:'Banana',
                link:'/sfsites/c/resource/bg'
            }
    
            ],
    
            shelter :[
             {   id:1,
                name:'dog',
                link:'/sfsites/c/resource/bg'
             },
             {   id:2,
                 name:'2',
             link:'/sfsites/c/resource/bg'
            },
            {   id:3,
                name:'3',
            link:'/sfsites/c/resource/bg'
           }
    
            ],
            medicines :[
                {   id:1,
                    name:'dog',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:2,
                    name:'Dolo',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:3,
                    name:'digene',
                    link:'/sfsites/c/resource/bg'
                 }
    
            ]
    
            
    
        },
        bird:{
            food:[ {
                id:1,
                name:'dog',
                link:'/sfsites/c/resource/bg'
             
            },{id:2,
                name:'dog',
                link:'/sfsites/c/resource/bg'
            },
            {  id:3,
                name:'Banana',
                link:'/sfsites/c/resource/bg'
            }
    
            ],
    
            shelter :[
             {   id:1,
                name:'dog',
                link:'/sfsites/c/resource/bg'
             },
             {   id:2,
                 name:'2',
             link:'/sfsites/c/resource/bg'
            },
            {   id:3,
                name:'3',
            link:'/sfsites/c/resource/bg'
           }
    
            ],
            medicines :[
                {   id:1,
                    name:'dog',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:2,
                    name:'Dolo',
                    link:'/sfsites/c/resource/bg'
                 },
                 {  id:3,
                    name:'digene',
                    link:'/sfsites/c/resource/bg'
                 }
    
            ]
    
            
    
        }
    
    }
    
    animal =this.data.farm;
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    connectedCallback(){
        this.handlefarmClick();
    }




    handlefarmClick(){
        this.animal =this.data.farm;
    }

    
    handleDogClick(){
      this.animal=this.data.dog;
    }

    
    handleCatClick(){
       this.animal=this.data.cat
    }

    
    handleFishClick(){
      this.animal=this.data.fish;
    }

    handleBirdClick(){
  this.animal=this.data.bird;
    }
}