const genPDF = async (name)=>{
    const { PDFDocument , rgb } = PDFLib;
    
    const exBytes = await fetch("./certiSample.pdf").then((res)=>{  return res.arrayBuffer();
    });
    const existingFont = await fetch("./Sanchez-Regular.ttf").then((res)=>{
        return res.arrayBuffer();
    });
    const pdfDocument = await PDFDocument.load(exBytes);

    pdfDocument.registerFontkit(fontkit);
    const myFont = await pdfDocument.embedFont(existingFont);

    const pages = pdfDocument.getPages();
    const firstPg = pages[0];
    const { width, height} = firstPg.getSize();
    firstPg.drawText(name, {
        x: width / 2  - height/2  +80,
        y: 289,
        size: 40,
        font: myFont,
        color: rgb(.2,0.84,0.67),
    });

    const uri = await pdfDocument.saveAsBase64({dataUri: true});
    saveAs(uri, "ParticipationCerti.pdf", {autoBom: true});


    // document.querySelector("#myPDF").src = uri;

};

const validate=(name)=>{
fetch("./responses.json").then(
        function(u){ return u.json();}
      ).then(
        function(json){
        let flag = 0;
          json.map((curElem)=>{
              const pName = curElem.Name.toUpperCase();
              
              if(pName.indexOf(name)>-1){
                  flag = 1;
                  genPDF(curElem.Name.toUpperCase());
              }
              });
              if(flag==0){
                  alert("Your Record Not Found 😢, Please verify the details once");
              }
        }
      );
    
    };
  

const subBtn = document.getElementById("submit");
subBtn.addEventListener("click",()=>{
    const name = document.getElementById("name").value.toUpperCase();
    if(name ==""){
        alert("Please fill your name first");
    }
    else{
        validate(name);
    }
    
} );
// genPDF("Ganda Baccha");
