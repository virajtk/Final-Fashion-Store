# Fashion-Store
Online Shopping Cart System for a Fashion Store

Frontend Admin Side Part

1. Navigate to Front-End-Client Folder and give following commands
    >>>npm install
    >>>npm start
2. Open Web Application using a Browser (Google Chrome)

// Initialization
First add assets folder to public folder (Not src folder) and import all the css and javaScript files to index.html file.
CSS Files import to the header tag and add Js files outside the body tag.

In App.css file no need to change because there isn't anything implement I do all the css part in assets/css/style.css file

In App.js file used for calling the components. You can change it.
Install react router dom for the routing part
$ npm install --save react-router-dom

Do not change any CSS files that implemented in assets if you need you can add styles in styles.css file using your own classNames also you can use any implemented class for your components.

  if(this.state.currentUserObj.role == 1){
            this.props.history.push('/AdminDashboard');
        }
        else if(this.state.currentUserObj.role == 2){
            this.props.history.push('/ProductManagement');
        }
         else if(this.state.currentUserObj.role == 3){
             this.props.history.push('/Home');
         }

