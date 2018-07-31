var one = [];
var one_value = [];
var two = [];
var two_value = [];
var opp = [];

var sequence = "";
var sequence_json = {};

var win = 0;

var powers = {
    fire : [ "grass", "ghost" ],
    water : [ "fire" ],
    grass : [ "electric", "fighting" ],
    electric : [ "water" ],
    psychic : [ "ghost" ],
    ghost : [ "fighting", "fire", "electric" ],
    fighting : [ "electric" ],
};
    
$(document).ready(function()
                 {
    
    console.log("Application has been started");
    
    $('.start_fight').click(function()
                           {
       
        if(checker())
            {
                $('#appender').html("<p> All the checking done. </p> <p> Fight Simulation Started !!! </p><br>");
                
                firstRound();
                
                console.log("After Round 1 : ");
                console.log("User List : ");
                console.log(one);
                console.log("Opponent List : ");
                console.log(two);
                
                secondRound();
                
                console.log("After Round 2 : ");
                console.log("User List : ");
                console.log(one);
                console.log("Opponent List : ");
                console.log(two);
                
                if(win<3)
                {
                    $('#appender').html(" <p> <b>There are no chance of winning.</b> </p> ");
                    return;
                }
                
                thirdRound();

                console.log("JSON winning seqence : ");
                console.log(sequence_json);
                
                generateSequence();
                
            }
        else
            {
                $('#appender').html(" <p> Not A Valid Pokens(Only 5 pokens allowed and all should be different) </p> ");
            }
    });
    
});

function generateSequence()
{
    console.log(opp);
    
    for(let i=0;i<opp.length;i++)
    {
        if(i==0)
        sequence += sequence_json[opp[i]];
        else
        sequence += ";"+sequence_json[opp[i]];
    }
    
    $('#appender').append("<br><p> Winning Sequence : "+ sequence +" </p>");
}

function firstRound()
{
    let clear = 0;
    
    for(let j=0; j<one.length; j++ )
    {
        console.log(j);
        console.log(one[j]);
        
        adv = powers[one[j]];
        
        for(let i = 0; i<adv.length; i++ )
        {
            clear = 0;
            let index = two.indexOf(adv[i]);
            
            if( index != -1 )
                {
                    if( (one_value[j]>two_value[index]) || (one_value[j]>(two_value[index]-10)) )
                        {
                            win++;
                            clear = 1;
                            sequence_json[two[index]] = one[j]+"#"+one_value[j];
                            $('#appender').append("<p class='status'> "+ one[j] +" wins "+ two[index] +" </p>");
                            one.splice(j,1);
                            one_value.splice(j,1);
                            two.splice(index,1);
                            two_value.splice(index,1);
                            j--;
                        }
                }
            if(clear == 1)
                break;
            
        }
    }
}

function secondRound()
{
    if(one.length == 0)
        return 0;
    
    for(let i=0; i<one_value; i++)
    {
        for(let j=0; j<two_value; j++)
        {
            if(one_value[i]>two_value[i])
            {
                win++
                sequence_json[two[j]] = one[i]+"#"+one_value[i];
                $('#appender').append("<p class='status'> "+ one[i] +" wins "+ two[j] +" </p>");
                one.splice(i,1);
                one_value.splice(i,1);
                two.splice(j,1);
                two_value.splice(j,1);
                j--;
                i--;
                break;
            }
        }
    }
}

function thirdRound()
{
    if((one.length == 0) || (win<3) )
        return 0;
    
    console.log("Third & Final Round");
    
    for(let i=0; i<one.length; i++)
    {
        sequence_json[two[i]] = one[i]+"#"+one_value[i];
        if(one_value[i] == two_value[i])
        {
            $('#appender').append("<p class='status'> "+ one[i] +" draws "+ two[i] +" </p>");
        }
        else
            $('#appender').append("<p class='status'> "+ one[i] +" loses to "+ two[i] +" </p>");
            
    }
    
}

function checkUnique()
{
    let checker = {};
    for(let i=0; i<one.length; i++)
    {
        checker[one[i]] = 1;
    }
    
    if(Object.keys(checker).length != 5)
        return 1;
    
    checker = {};
    for(let i=0; i<two.length; i++)
    {
        checker[two[i]] = 1;
    }
    
    if(Object.keys(checker).length != 5)
        return 1;
    
    return 0;
}

function checker()
{
    win = 0;
    one = [];
    one_value = [];
    two = [];
    two_value = [];
    opp = [];
    sequence = "";
    sequence_json = { };
    
    var a = $('#box1').val();
    var c = $('#box2').val();
    
    a = a.split(";");
    b = c.split(";");
    
    if( (a.length != 5) && (b.length != 5) )
    {
        return 0;
    }
    
    a.map((item)=>{
        var temp = item.toLowerCase().split("#");
        one.push(temp[0]);
        one_value.push(temp[1]);
    });
    
    b.map((item)=>{
        var temp = item.toLowerCase().split("#");
        two.push(temp[0]);
        opp.push(temp[0]);
        two_value.push(temp[1]);
    });
    
    //console.log("Whole User list :");
    //console.log(a);
    //console.log("Whole Oppenents list :");
    //console.log(b);
    //console.log("One :");
    //console.log(one);
    //console.log(one_value);
    //console.log("Two");
    //console.log(two);
    //console.log(two_value);
    
    if(checkUnique())
        return 0;
    
    return 1;
    
}
