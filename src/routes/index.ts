import baseRoutes from "./basic"



const MainRoute = (app:any)=>{
    app.use('/',baseRoutes);
}

export default MainRoute;