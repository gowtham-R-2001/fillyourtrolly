export function sort(type, data, callback) {
    let ln = data.length;
    data = (type === "highprice") ? desc(data, ln) : asc(data, ln);
    callback(data);
}


function desc(data, ln)
{
    for(let i = 0; i < ln; i++)
    {
        for(let j = 0; j < ln-i-1; j++)
        {
            if( (parseInt(data[j].starRating.split(" ")[0]) <= parseInt(data[j+1].starRating.split(" ")[0])) && 
                (parseInt(data[j].price.replace(",","")) < parseInt(data[j+1].price.replace(",","")))) 
            {
                let temp = data[j];
                data[j] = data[j+1];
                data[j+1] = temp;
            }
        }
    }

    return data;
}

function asc(data, ln)
{
    for(let i = 0; i < ln; i++)
    {
        for(let j = 0; j < ln-i-1; j++)
        {
            if( (parseInt(data[j].starRating.split(" ")[0]) <= parseInt(data[j+1].starRating.split(" ")[0])) && 
                (parseInt(data[j].price.replace(",","")) > parseInt(data[j+1].price.replace(",","")))) 
            {
                let temp = data[j];
                data[j] = data[j+1];
                data[j+1] = temp;
            }
        }
    }

    return data;
}