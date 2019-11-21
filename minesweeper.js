//var flag=5;
//var lev_flag=5;

var gamestart=1;
var check_running=0;


function disableScreen()
	{
		var div= document.createElement("div");
		div.className += "overlay";
		document.body.appendChild(div);

	}
	
	
function displayscreen()
	{	
		window.location.reload(true);

	}
	
	
function lost_game()
	{
		swalS("you lost the game");
		disableScreen();
		setTimeout(displayscreen, 3000);
    
	}
	
function shuffle(array)
	{
		array.sort(() => Math.random() - 0.5);
	} 
	
	
function level(no_of_flag)
	{	check_running++;
		if(check_running>1)
		{ swal("First finish or reset the game before switch");
		}
		
	if(gamestart>=1){
	gamestart--;	
	console.log("no of flag",no_of_flag);
	

	flag=no_of_flag;
	lev_flag=no_of_flag;
	counter=0;
	main_game(flag,lev_flag,counter);
	
	}
	}	
var p=document.getElementById("easy");
p.setAttribute("onclick","level(7)");
var p=document.getElementById("medium");

p.setAttribute("onclick","level(15)")

var p=document.getElementById("hard");
p.setAttribute("onclick","level(20)");
var p=document.getElementById("restart");
p.setAttribute("onclick","displayscreen()");



function func(maze,m,n,sol) 
	{
		if(sol[m][n]!==1)
		{
			sol[m][n]=1
			
			if(maze[m-1][n-1]===0)
			{
				func(maze,m-1,n-1,sol)
			}
			else
			{
				sol[m-1][n-1]=1
			}

			if(maze[m-1][n]===0)
			{
				func(maze,m-1,n,sol)
			}
			else
			{
				sol[m-1][n]=1
			}

			if(maze[m-1][n+1]===0)
			{
				func(maze,m-1,n+1,sol)
			}
			else
			{
				sol[m-1][n+1]=1
			}

			if(maze[m][n-1]===0)
			{
				func(maze,m,n-1,sol)
			}
			else
			{
				sol[m][n-1]=1
			}

			if(maze[m][n+1]===0)
			{
				func(maze,m,n+1,sol)
			}
			else
			{
				sol[m][n+1]=1
			}

			if(maze[m+1][n-1]===0)
			{
				func(maze,m+1,n-1,sol)
			}
			else
			{
				sol[m+1][n-1]=1
			}

			if(maze[m+1][n]===0)
			{
				func(maze,m+1,n,sol)
			}
			else
			{
				sol[m+1][n]=1
			}

			if(maze[m+1][n+1]===0)
			{
				func(maze,m+1,n+1,sol)
			}
			else{
				sol[m+1][n+1]=1
			}
		}
	}
























function main_game(flag,lev_flag,counter)
{
	document.getElementById("flag").innerHTML=flag;
	var row_ = [0,7,5,8,3,2,6,4,1,9] //not cop 4 lines
	shuffle(row_)
	var column_ = [5,3,7,4,2,8,9,0,1,6]
	shuffle(column_)
	for (var i=1;i<row_.length;i++){
		column_.push(column_[i]);
		
	}
	column_.push(column_[0]);
	row_=row_.concat(row_);
	
	
	
// creating a zero matrix of size 12X12 to palnt numbers according to bomb
var game = Array(12).fill().map(() => Array(12).fill(0));
for(var i=0;i<12;i++)
	{
		game[0][i]=1;
		game[11][i]=1;
		game[i][0]=1;
		game[i][11]=1;
	}


var table = document.getElementById("table1").rows;
var y;
for(var i = 0; i <flag; i++)
	{   
		// planting bomb using random index whic is created in line 23
		table[row_[i]].cells[column_[i]].style.background = 'url(' + "bomb.png" + ')';
		// increament number around bombs
		var m=row_[i]+1
		var n=column_[i]+1
		game[m][n]=-9;                          
		game[m-1][n-1]=game[m-1][n-1]+1;   
		game[m-1][n]=game[m-1][n]+1;
		game[m-1][n+1]=game[m-1][n+1]+1;
		game[m][n-1]=game[m][n-1]+1;
		game[m][n+1]=game[m][n+1]+1;
		game[m+1][n-1]=game[m+1][n-1]+1;
		game[m+1][n]=game[m+1][n]+1;
		game[m+1][n+1]=game[m+1][n+1]+1;
	}


//  apply these incremented number to origional table



for (var i = 0; i < 10; i++) 
	{ 
		var x = document.getElementById("table1").rows[i].cells;
		for (var j = 0; j < 10; j++)
			{ 
				if(game[i+1][j+1]>0)
				{  	// write only that number which is greater than 0
					x[j].innerHTML = game[i+1][j+1]; 
				}
			} 
	}

var table = document.getElementById("table2"),rIndex,cIndex;

for(var i = 0; i < table.rows.length; i++)
    {
        for(var j = 0; j < table.rows[i].cells.length; j++)
        {	//console.log(table.rows[i].cells[j].innerHTML);
            table.rows[i].cells[j].onmousedown = function(event)
			
            {
                console.log("event clicked")
                console.log(event.button);
                rIndex = this.parentElement.rowIndex+1;
                cIndex = this.cellIndex+1;
                if(event.button===0)
                {
                    if(this.innerHTML=="f")
					{
                        flag++;
                        document.getElementById("flag").innerHTML=flag;
                    }
					
                    this.style.visibility="hidden";
                    rIndex = this.parentElement.rowIndex+1;
                    cIndex = this.cellIndex+1;
                    var sol = Array(12).fill().map(() => Array(12).fill(0));
                    console.log(game[rIndex][cIndex]);
                   if(game[rIndex][cIndex]<0 && event.button!=2)
				   {
						lost_game();
                   }
                    if(game[rIndex][cIndex]===0)
					{
                        func(game,rIndex,cIndex,sol);
                    }
                    for (var i = 0; i < 10; i++) 
					{ 
                        var x = document.getElementById("table2").rows[i].cells;
                        for (var j = 0; j < 10; j++) 
						{ 
                            if(sol[i+1][j+1]===1)
							{
                                x[j].style.visibility="hidden"; 
                            }
                        } 
                    }
                }

                if(event.button===2 )

                
                if(this.innerHTML!="f")
                   {
					if(game[rIndex][cIndex]<0)
					{
						console.log("bomb");
						counter++;
						console.log(counter);
                    }
                    if(counter==lev_flag)
					{
                        swal("Good job!","you won the game","success" );
                        setTimeout(displayscreen, 3000);
                    }
                    if(flag<1)
                    {
						setTimeout(lost_game,1000);
                    }

					flag--;
                    
                    this.style.background = 'url(' + "flag.png" + ')';
                    this.innerHTML="f";
                   
            
                    console.log(this.innerHTML);
                    document.getElementById("flag").innerHTML=flag;
                }
            
            };
        }
    }



}