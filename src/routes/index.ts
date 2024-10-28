import baseRoutes from "./User_routes"



const MainRoute = (app:any)=>{
    app.use('/',baseRoutes);
}

export default MainRoute;