import toast from 'react-hot-toast';
// import dataJSON from '../../public/data.json';
import emailjs from '@emailjs/browser';


const createToast=(title: string, msg: string, color: string)=>{toast.custom((t) => (
  
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      }
      max-w-md w-full ${color=='Green'?"bg-[#04b20c]":color=='Yellow'?"bg-[#eab90f]":"bg-[#e13f32]"} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4 ">
        <div className="flex items-start">
          
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">
              {title}
            </p>
            <p className="mt-1 text-sm text-white">
              {msg}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        
          <button
          onClick={() => toast.dismiss(t.id)}
          type="button"
          className="mr-2 box-content rounded-none border-none opacity-100 hover:no-underline hover:opacity-50 focus:opacity-50 focus:shadow-none focus:outline-none text-white"
          data-te-toast-dismiss
          aria-label="Close">
          <span
            className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
          
      </div>
    </div>
  ))};

const generateAlerts = async () => {
  let dataJSON: any;
let headers = new Headers();
await fetch("http://127.0.0.1:8000/data?cols=Price,Price_Delta,FitchsRating,FitchsRating_Delta",{method:'GET',headers:headers})
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
    dataJSON=data;
  })
const alertSettings=localStorage.getItem("alertSettings");
if (alertSettings){
  let sendEmail=false;
  let sendWts=false;
  let emailBody="";
  let wtsMsgBody=encodeURIComponent("[This is a test message]\n[System generated message]\n\nBPB Alerts:\n\n");
  for (const alertSetting of JSON.parse(alertSettings)) {
    console.log(alertSetting);
    if (alertSetting.notiArr.includes("Email")) sendEmail=true;
    if (alertSetting.notiArr.includes("Whatsapp")) sendWts=true;
    const value=isNaN(parseFloat(alertSetting.value))?alertSetting.value:parseFloat(alertSetting.value);
    const para=alertSetting.criterion<2?alertSetting.para+"_Delta":alertSetting.para;
    if (alertSetting.id=="ALL"){
      Object.keys(dataJSON).map((id:string)=>
      {
        const condition=alertSetting.criterion=='0'?-1*dataJSON[id][para]>=value:
        alertSetting.criterion=='1'||alertSetting.criterion=='3'?dataJSON[id][para]>=value:
        alertSetting.criterion=='2'?dataJSON[id][para]<=value:
        value==dataJSON[id][para];
        const realValue=alertSetting.criterion=='0'?dataJSON[id][para]*-1:dataJSON[id][para];
        if (condition){
          const msg=`${alertSetting.para} of ${id} ${alertSetting.criterion==0?"goes down by":alertSetting.criterion==1?"goes up by":alertSetting.criterion==2?"is smaller than":alertSetting.criterion==3?"is greater than":"is equal to"} ${realValue}`;
          if (alertSetting.notiArr.includes("Popup")){
          createToast(id,msg,alertSetting.color)
          }
          if (alertSetting.notiArr.includes("Email")) emailBody+="<b>"+id+"</b><br />"+msg+"<br /><br />";
          if (alertSetting.notiArr.includes("Whatsapp")) wtsMsgBody+=encodeURIComponent("*"+id+"*"+"\n"+msg+"\n\n");

        }
    

      }

      );
    }
    else{
      console.log(value);
      console.log(dataJSON[alertSetting.id][para])
      const id=alertSetting.id;
      
      const condition=alertSetting.criterion=='0'?-1*value<=dataJSON[id][para]:
        alertSetting.criterion=='1'||alertSetting.criterion=='3'?value>=dataJSON[id][para]:
        alertSetting.criterion=='2'?value<=dataJSON[id][para]:
        value==dataJSON[id][para];
        const realValue=alertSetting.criterion=='0'?dataJSON[id][para]*-1:dataJSON[id][para];
        
        if (condition){
          const msg=`${alertSetting.para} of ${id} ${alertSetting.criterion==0?"goes down by":alertSetting.criterion==1?"goes up by":alertSetting.criterion==2?"is smaller than":alertSetting.criterion==3?"is greater than":"is equal to"} ${realValue}`;
          if (alertSetting.notiArr.includes("Popup"))createToast(id,msg,alertSetting.color);
          if (alertSetting.notiArr.includes("Email")) emailBody+="<b>"+id+"</b><br />"+msg+"<br /><br />";
          if (alertSetting.notiArr.includes("Whatsapp")) wtsMsgBody+=encodeURIComponent("*"+id+"*"+"\n"+msg+"\n\n");


        }
      }
  };
  if (sendEmail)emailjs.send("service_8jn5x2f","template_pvl5769",{message:emailBody,to_email:"danielsin816@gmail.com",to_name:"A"},"ww2Ud0MplXxi_w3NH");
  const NUMBER=85255344322;
  if (sendWts){
    fetch(`http://127.0.0.1:3000/send/${NUMBER}/${wtsMsgBody}`,{method:'GET'})
  };

  }
}

export default generateAlerts;
  