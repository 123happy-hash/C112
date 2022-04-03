Webcam.set({
    height: 300,
    width: 300,
    image_format: "png",
    png_quality: 90
});

WebcamView = document.getElementById("WebcamView");
Webcam.attach("#WebcamView");

function CapImg(){
    Webcam.snap(function(data_uri){
        document.getElementById("SnapshotView").innerHTML = "<img src ="+ data_uri + " id = 'SnapImg' >";
    });
}

console.log("ml5 version is ", ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XyNvbOUT1/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model has been initialized");
}

function speak(){
    var speech = window.speechSynthesis;
    sd1 = "The first prediction is " + Prediction1;
    sd2 = "and the Second prediction is " + Prediction2;
    Utterthis = new SpeechSynthesisUtterance(sd1 + sd2);
    speech.speak(Utterthis);

}

function PredictEmotion(){
    img = document.getElementById("SnapImg");
    Classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("emoji_one_name").innerHTML = results[0].label;
        document.getElementById("emoji_two_name").innerHTML = results[1].label;

        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak()

        if(results[0].label == "Happy"){
            document.getElementById("emoji_one_img").innerHTML = "😁";
        }else if(results[0].label == "Sad"){
            document.getElementById("emoji_one_img").innerHTML = "😥";
        }else if(results[0].label == "Angry"){
            document.getElementById("emoji_one_img").innerHTML = "🤬";
        }

        if(results[1].label == "Happy"){
            document.getElementById("emoji_two_img").innerHTML = "😊";
        }else if(results[1].label == "Sad"){
            document.getElementById("emoji_two_img").innerHTML = "😔";
        }else if(results[1].label == "Angry"){
            document.getElementById("emoji_two_img").innerHTML = "😤";
        }
    }
}