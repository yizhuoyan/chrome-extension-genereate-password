			window.addEventListener("load",function(evt){
				generateSpecialCharHTML();
				addListeners();
			});
			
			var addListeners=function(){
				document.querySelectorAll(".toggleCheckBox").forEach(function(e){
					e.addEventListener("click",function(evt){
						var dataForSelector=this.getAttribute("data-for");
						var dataForElements=[];
						if(dataForSelector){
							dataForElements=document.querySelectorAll(dataForSelector);
						}
						if(this.checked){
							this.nextElementSibling.classList.remove("disabled");
							
							dataForElements.forEach(e=>e.disabled=false);
						}else{
							this.nextElementSibling.classList.add("disabled")
							dataForElements.forEach(e=>e.disabled=true);
						}
					})
				});
				
				document.getElementById("includeAllEL").addEventListener("click",function(){
					var specialCharArray=document.getElementsByName("specialChar");
					if(this.checked){
						specialCharArray.forEach(e=>e.checked=true);
					}else{
						specialCharArray.forEach(e=>e.checked=false);
						$("toggleSpecialCharEL").click();
					}
				});
				
				document.getElementById("generateBtn").addEventListener("click",function(){
					var opt={};
					//digit
					var digitAmountEL=$("digitAmountEL");
					if(!digitAmountEL.disabled){
						opt.digitAmount=Number(digitAmountEL.value);
					}
					//lowerLetter
					var lowerLetterAmountEL=$("lowerLetterAmountEL");
					if(!lowerLetterAmountEL.disabled){
						opt.lowerLetterAmount=Number(lowerLetterAmountEL.value);
					}
					//upperLetter
					var upperLetterAmountEL=$("upperLetterAmountEL");
					if(!upperLetterAmountEL.disabled){
						opt.upperLetterAmount=Number(upperLetterAmountEL.value);
					}
					//specialChar
					var specialCharAmountEL=$("specialCharAmountEL");
					if(!specialCharAmountEL.disabled){
						opt.specialCharAmount=Number(specialCharAmountEL.value);
						//which
						var specialChars=[];
						var specialCharElementList=document.getElementsByName("specialChar");
						for(var i=specialCharElementList.length,cb;i-->0;){
							if((cb=specialCharElementList[i]).checked){
								specialChars.push(cb.value);
							}
						}
						opt.specialChars=specialChars.join("");
					}
					//needLength
					opt.needLength=Number($("needLengthEL").value);
					
					var result=generateChars(opt);
					
					$("resultEL").value=result;
				});
				
			};
			
			var $=function(id){
				return document.getElementById(id);
			};
			
			$.randomAB=function(min, max) {
					return Math.floor(Math.random() * (max - min)) + min;
			};
			
			$.nextUpperLetter=function() {
					var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					return chars.charAt($.randomAB(0, chars.length));
			};
			$.nextLowerLetter=function() {
					var chars = "abcdefghijklmnopqrstuvwxyz";
					return chars.charAt($.randomAB(0, chars.length));
			};
			$.nextDigit=function() {
					var chars = "1234567890";
					return chars.charAt($.randomAB(0, chars.length));
			};
			$.allSpecialChars="~!@#$%^&*()_+-=`[]{};':\",.<>/?$",

			$.nextSpecialChar=function(chars) {
					chars = chars || $.allSpecialChars;
					return chars.charAt($.randomAB(0, chars.length));
			};

			var escapeString = (function() {
				var div = document.createElement("div");
				return function(s) {
					div.textContent = s;
					return div.innerHTML;
				} 
			})();

			var generateSpecialCharHTML = function() {

				var chars = $.allSpecialChars;
				var html = "";
				for(var i = 0, c, len = chars.length; i < len; i++) {
					c = chars.charAt(i);
					html += "<label>";
					html += '<input name="specialChar" checked  type="checkbox" value="' + c + '" > ';
					html += escapeString(c);
					html += " </label>";
				}

				var container = document.getElementById("specialCharContainer");
				container.innerHTML = html;
			};

			var generateChars0 = function(result, opt) {
				var needLength = opt.needLength;
				//digit
				for(var i = opt.digitAmount; result.length < needLength && i-- > 0;) {
					result.push($.nextDigit());
				}
				//upperLetters
				for(i = opt.upperLetterAmount; result.length < needLength && i-- > 0;) {
					result.push($.nextUpperLetter());
				}
				//lowerLetters
				for(i = opt.lowerLetterAmount; result.length < needLength && i-- > 0;) {
					result.push($.nextLowerLetter());
				}
				//specialChar
				for(i = opt.specialCharAmount; result.length < needLength && i-- > 0;) {
					result.push($.nextSpecialChar(opt.specialChars));
				}
			}
			var generateChars = function(opt) {
				var result = [];
				var needLength = opt.needLength;
				while(result.length < needLength) {
					//fill random char
					generateChars0(result, opt);
					if(result.length===0){
						break;
					}
				}

				return result.join("");
			};

