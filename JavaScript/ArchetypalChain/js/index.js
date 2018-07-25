function aa(){}

var bb = new aa();

aa.prototype.cc=function(){
    alert(1);
};

bb.cc();