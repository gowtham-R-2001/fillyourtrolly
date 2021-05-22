export function sort(type, data, callback) {
    removeDup(data)
    .then((res) => {
        if(type === "highprice") {
            desc(res)
            .then(response =>  {
                return ratingFilter(response, "desc");
            })
            .then((filteredResponse) => {
                callback(filteredResponse);
            })
        }
        else {
            asc(res)
            .then(response => {
                return ratingFilter(response, "asc");
            })
            .then((filteredResponse) => {
                callback(filteredResponse);
            })
        }
    })
}


function removeDup(data)
{
    let arr = [];
    let titlearr = [];

    return (new Promise((resolve, reject) => {
        for(let i = 0; i < data.length; i++)
        {
            if(!titlearr.includes(data[i].title)) {
                titlearr.push(data[i].title);
                arr.push(data[i]);
            }

            if(i === data.length-1)
                resolve(arr);
        }
    }));
}


function desc(data)
{
    return (new Promise((resolve, reject) => {
        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < data.length-i-1; j++)
            {
                if( parseInt(replaceAll(data[j].price, ",", "")) < parseInt(replaceAll(data[j+1].price, ",", "")) )
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }

            if(i === data.length-1) {
                resolve(data);
            }
        }
    }));
}

function asc(data)
{
    return (new Promise((resolve, reject) => {
        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < data.length-i-1; j++)
            {
                if( parseInt(replaceAll(data[j].price, ",", "")) > parseInt(replaceAll(data[j+1].price, ",", "")) )
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }

            if(i === data.length-1)
                resolve(data);
        }
    }));
}

function ratingFilter(data, filter) {

    let descPromise = new Promise((resolve, reject) => {
        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < data.length-i-1; j++)
            {
                if(parseFloat(data[j].starRating.split(" ")[0]) > parseFloat(data[j+1].starRating.split(" ")[0]))
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }

            if(i === data.length-1)
                resolve(data);
        }
    });

    let ascPromise = new Promise((resolve, reject) => {
        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < data.length-i-1; j++)
            {
                if(parseFloat(data[j].starRating.split(" ")[0]) < parseFloat(data[j+1].starRating.split(" ")[0]))
                {
                    let temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }

            if(i === data.length-1)
                resolve(data);
        }
    });

    return(filter === "desc" ? descPromise : ascPromise);
}

const replaceAll = (str, find, replace) => {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}