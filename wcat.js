let fs=require("fs");
let path=require("path");
let inpPath=process.argv.slice(2);
let optionArray=[];
let filesPathArray=[];
for(let i=0;i<inpPath.length;i++){
    let check=inpPath[i].charAt(0);
    if(check=="-"){
        optionArray.push(inpPath[i]);
    }else{
        filesPathArray.push(inpPath[i]);
    }
}
for(let i=0;i<filesPathArray.length;i++){
    let filePath=filesPathArray[i];
    if(fs.existsSync(filePath)){
        let info=fs.lstatSync(filePath);
        if(info.isFile()==false){
            console.log("please enter file path");
            return;
        }
    }
    else{
        console.log("file does not exist");
        return;
    }
}
let content="";
for(let i=0;i<filesPathArray.length;i++){
    content=content+fs.readFileSync(filesPathArray[i])+"\r\n";
}
let tempArr=[];
let todna=content.split("\r\n");
let isPresent=optionArray.includes("-s");
    if(isPresent){
    for(let j=1;j<todna.length;j++){
        if(todna[j]=="" && todna[j-1]==""){
            todna[j]=null;
        }
        else if(todna[j]=="" && todna[j-1]==null){
            todna[j]=null;
        }
    }
    for(let i=0;i<todna.length;i++){
        if(todna[i]!=null){
            tempArr.push(todna[i]);
        }
    }
    todna=tempArr;
}
let check1=optionArray.includes("-n");
let check2=optionArray.includes("-b");
if(check1 && check2){
    let large=optionArray.indexOf("-n");
    if(optionArray.indexOf("-b")>large){
        large=optionArray.indexOf("-b");
    }
    optionArray.splice(large,1);
}
//isPresent=optionArray.includes("-n");
    if(optionArray.includes("-n")){
    for(let i=0;i<todna.length;i++){
         todna[i]=i+1+" "+todna[i];
    }
    }
//isPresent=optionArray.includes("-b");
if(optionArray.includes("-b")){
    for(let i=0;i<todna.length;i++){
        if(todna[i].length!=0){
            todna[i]=i+1+" "+todna[i];
        }
    }
}
console.log(todna.join("\n"));