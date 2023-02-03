
class FetchHelper{
     static getData= async (url,headers={})=>{
       console.log(url);
       const response=await fetch(url,
        {
            crossDomain:true,
            method:'GET',
            headers:headers
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      
        console.log(data);
        return  data;
    }

    
   static getDataPost=async (url,info,header={})=>{
        // main.js

    // POST request using fetch()
       const response=await fetch(url, {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify(info),
            
            // Adding headers to the request
            headers:header
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    static post=async (url)=>{
        // main.js

    // POST request using fetch()
       const response=await fetch(url, {
        
            // Adding method type
            method: "POST",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    static put=async (url,info,headers={})=>{
        // main.js

    // POST request using fetch()
       const response=await fetch(url, {
        
            // Adding method type
            method: "PUT",
            
            // Adding body or contents to send
            body: JSON.stringify(info),
            
            // Adding headers to the request
            headers: headers,
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
}




export default FetchHelper;