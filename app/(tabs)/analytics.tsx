interface AnalyticsData {
    views: number;
    interactions: number;
    signups: number;
  }
function Analytics(){
    return(
        <AnalPage/>
    );
}
export default Analytics
function AnalPage(){
    return(
        <div>
            <h1>Analytics Page</h1>
            <p>Views: </p>
            <p>Interactions: </p>
            <p>Sign ups: </p>
            <p></p>
        </div>
    )
}