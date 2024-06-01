function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}
function titleCase(str) {
    var convertToArray = str.toLowerCase().split(' ');
    var result = convertToArray.map(function(val) {
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
    });
    
    return result.join(' ');
  }
var obj = getAllUrlParams();
const output = document.querySelector('div.invoice');
function maker() {

    

    console.log(obj);

    const myArray = obj['date'].split("%20");
    console.log(myArray);
    var date = "";
    date += myArray[0] + " " + myArray[1];

    
    
    var div =document.createElement('div');
    div.setAttribute("class", "details");

        var p= document.createElement('p');
        p.textContent ="STT: " + obj['stt'];
        div.append(p);

        p= document.createElement('p');
        p.textContent ="Ngày: " + date;
        div.append(p);

        p= document.createElement('p');
        p.setAttribute("class","tittle")
        p.textContent ="Tên KH: " + titleCase(decodeURIComponent(obj['customername']))
        div.append(p);

        p= document.createElement('p');
        p.setAttribute("class","tittle")
        p.textContent ="Số lượng: " + obj['quantity']+" Hộp";
        div.append(p);

        //p= document.createElement('p');
        //p.setAttribute("class","tittle")

        //const api ='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + obj['iddt']+ "_" + obj['idtua'] + "_" + obj['idkh'] + "_" + titleCase(decodeURIComponent(obj['customername'])) + "_" + obj['quantity']

                //var img = document.createElement('img');

                // Thiết lập thuộc tính src
                //img.setAttribute('src', api);

                // Thiết lập thuộc tính alt
                //img.setAttribute('alt', 'qrimage');

                // Thiết lập thuộc tính id
                //img.setAttribute('id', 'qrimage');

                //p.appendChild(img)

        //div.appendChild(p);



    output.append(div);

    var sttValue = obj['stt']; // Giá trị của obj['stt']




}
maker();





window.print();
if(obj['thietbi']=='computer'){
window.addEventListener('afterprint', function() {
    window.close(); // Đóng trang sau khi in
});
}
