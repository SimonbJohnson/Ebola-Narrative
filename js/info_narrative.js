
function generateParagraphs(id,data){
    data.forEach(function(d,i) {
    $(id).append('<div id="para' + i + '" class="col-md-12 para"><h3>'
            + d['date'] + '</h3>'
            + d['text'] + '</div>');
    });
    $(id).append('<div id="endbuffer"></div>');
}
    
function generateTimeline(id,data){
    var width = $(id).width()-10;
    var height = 70;
    var svg = d3.select("#timeline")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + 10 + ",0)");
    
<<<<<<< HEAD
    var format = d3.time.format("%d/%m/%Y");
    console.log (data[0]['date']);
    console.log (data[33]['date']);
    console.log (format.parse(data[0]['date']));
    console.log (format.parse(data[33]['date']));
    var scale = d3.time.scale()
            .range([0, width-50])
            .domain([format.parse(data[0]['date']),
                     format.parse(data[33]['date'])]);//changed data.length-1] to 34
=======
    var format = d3.time.format("%d/%m/%y");
    
    var scale = d3.time.scale()
            .range([0, width-50])
            .domain([format.parse(data[0]['date']),
                     format.parse(data[data.length-1]['date'])]);
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
                 
    var months = [
        {"date":"01/02/14","Month":"Feb"},
        {"date":"01/03/14","Month":"Mar"},
        {"date":"01/04/14","Month":"Apr"},
        {"date":"01/05/14","Month":"May"},
        {"date":"01/06/14","Month":"Jun"},
        {"date":"01/07/14","Month":"Jul"},
        {"date":"01/08/14","Month":"Aug"},
        {"date":"01/09/14","Month":"Sep"}];
        
    svg.selectAll("g1")
        .data(months)
        .enter()
        .append("text")
        .attr("x", function(d) {
            return scale(format.parse(d['date']));
        })
        .attr("y", 50)
        .attr("dy", ".35em")
        .attr("class","barlabel")
        .text(function(d,i) {
                return d['Month'];
        });
            
     svg.selectAll("g1")
         .data(months)
         .enter()
         .append("line")
         .attr("x1", function(d) {
              return scale(format.parse(d['date']));
         })
         .attr("y1", 30)
         .attr("x2", function(d) {
              return scale(format.parse(d['date']));
         })
            .attr("y2", 40)
            .attr("stroke-width", 1)
            .attr("stroke", "black");                 



    svg.append("line")
        .attr("x1", 5)
        .attr("y1", 30)
        .attr("x2", width-50)
        .attr("y2", 30)
        .attr("stroke-width", 2)
        .attr("stroke", "black");           
    
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
             return scale(format.parse(d['date']));
        })
        .attr("cy", function(d) {
             return 30;
        })
        .attr("r", 3.5)
        .attr("id",function(d,i){return "time_"+i;})
        .attr("pos",function(d,i){return i;})
        .attr("fill","#999999")
        .on("click",function(){
            if(compact){
<<<<<<< HEAD
                showParagraph(parseInt($(this).attr('pos')),34);
=======
                showParagraph(parseInt($(this).attr('pos')),24);
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
                updateinfographic(parseInt($(this).attr('pos')));
            }
        });
        
    svg.append("circle")
        .attr("cx", 0)
        .attr("cy", function(d) {
             return 30;
        })
        .attr("r", 10)
        .attr("id","selectedcircle")
        .attr("opacity","0.5")
        .attr("fill","#4682B4");
        
    
        
    svg.selectAll("g2")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d) {
             return scale(format.parse(d['date']));
        })
        .attr("y", 10)
        .attr("dy", ".35em")
        .attr("id",function(d,i){
            return "timelinedate"+i;
        })
        .attr("class","barlabel hidden")
        .text(function(d,i) {
                return d['date'];
        });
         
}

function generateBarChart(id,datain){
    
    var data = new Array();
    datain["DeathsandCases"].forEach(function(d) {
        data=data.concat([d['Deaths'],d['Cases']]);
    });
    var margin = {top: 20, right: 30, bottom: 20, left: 130},
    width = $(id).width() - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;    
    var barHeight = (height)/data.length-10;   

    var x = d3.scale.linear()
<<<<<<< HEAD
        .domain([0, 3500])//This is the hard-coded maximum value for x axis of graph. We aim to write code to find this.
=======
        .domain([0,700])
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
        .range([0, width]);

    var svg  = d3.select(id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * (barHeight+10) + ")"; });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight)
        .attr("class",function(d,i) { if(i%2===0){return "deaths";}
                    else {
                        return "cases";
                    }
                });

    bar.append("text")
        .attr("x", function(d) { return x(d); })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .attr("class","barlabel")
        .text(function(d) { return d; });

    bar.append("text")
        .attr("x", -40)
        .attr("y", 2)
        .attr("dy", ".45em")
        .attr("class","smallfont")
        .text(function(d,i) { if(i%2===0){return "Deaths";}
                    else {
                        return "Cases";
                    }
                }
         );
                
    bar.append("text")
        .attr("x", -130)
        .attr("y", 0)
        .attr("dy", ".55em")
        .text(function(d,i){
            if(i===0){
                return "Guinea";
            }
            if(i===2){
                return "Liberia";
            }
            if(i===4){
                return "Sierra Leone";
            }
            if(i===6){
                return "Nigeria";
            }
        });                

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
}

function generateMap(id){
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = $(id).width() - margin.left - margin.right,
    height = 300;
    if(width<400){sc=500;center=[37, 0 ];fs="8px";shift=20;} else {sc=950;center=[13, 0 ];fs="14px";shift=0;}
    var projection = d3.geo.mercator()
        .center(center)
        .scale(sc);

    var svg = d3.select(id).append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");
    
    g.selectAll("path")
      .data(westafrica.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("id",function(d,i){return d.properties.NAME_REF.split(' ').join('_');})
          .attr("class",function(d,i){return d.properties.CLASS;})
          .attr("fill",function(d,i){
              if(d.properties.CLASS==="Country"){
                  if(d.properties.NAME_REF==="Sierra Leone"
                  || d.properties.NAME_REF==="Liberia" 
                  || d.properties.NAME_REF==="Guinea" 
                  || d.properties.NAME_REF==="Nigeria" 
                          ){
                      return "transparent";
                  } else {
                      return "#BBBBBB";
                  }
              }
              return "#FFFFFF";
          });        
          
    g.selectAll('text')
      .data(westafrica.features)
         .enter()
         .append("text")
         .attr("x", function(d,i){
                     if(d.properties.NAME_REF==="Guinea"){return path.centroid(d)[0]-80+shift;}
                     if(d.properties.NAME_REF==="Sierra Leone"){return path.centroid(d)[0]-70+shift;}
                     if(d.properties.NAME_REF==="Liberia"){return path.centroid(d)[0]-60+shift;}
                     return path.centroid(d)[0]-30+shift;})
         .attr("y", function(d,i){
                     if(d.properties.NAME_REF==="Sierra Leone"){return path.centroid(d)[1]+10;}
                     if(d.properties.NAME_REF==="Liberia"){return path.centroid(d)[1]+10;} 
                     return path.centroid(d)[1];})
         .attr("dy", ".55em")
         .attr("class","maplabel")
         .style("font-size",fs)
         .text(function(d,i){if(d.properties.NAME_REF==="Sierra Leone"
                  || d.properties.NAME_REF==="Liberia" 
                  || d.properties.NAME_REF==="Guinea" 
                  || d.properties.NAME_REF==="Nigeria" 
                          ){
                      return d.properties.NAME_REF;
                  } else {
                      return "";
                  }});
}

function highlighttimeline(id,num){
    
    var width = $(id).width()-10;
    var height = 100;

    var format = d3.time.format("%d/%m/%y");    
    
    var scale = d3.time.scale()
            .range([0, width-50])
            .domain([format.parse(data[0]['date']),
                     format.parse(data[data.length-1]['date'])]);    
       
    d3.select('#selectedcircle')
        .transition()
        .attr("cx", function() {
             return scale(format.parse(data[num]['date']));
        });
        
}

function highlightmap(num){
    var d = data[num].RegionDeaths;
    d.forEach(function(element){
<<<<<<< HEAD
               d3.select("#"+element.Region.split(' ').join('_')).transition().attr("fill",numtohex(element.Deaths,1300)); 
=======
               d3.select("#"+element.Region.split(' ').join('_')).transition().attr("fill",numtohex(element.Deaths,250)); 
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
            });
}

function numtohex(num,limit){
    limit=limit+75;
    if(num>0){num=num*1+75;}
    //red=Math.round((num)/limit*50)+253;
    red=253;
    bluegreen = 253-Math.round((num)/limit*253);
    redhex = red.toString(16);
    if(redhex.length===1){
        redhex="0"+redhex;
    }
    bluegreenhex = bluegreen.toString(16);
    if(bluegreenhex.length===1){
        bluegreenhex="0"+bluegreenhex;
    }
    return "#"+redhex+bluegreenhex+bluegreenhex;
}
            
/////////////////////////////////////
//functions for expanded view only
////////////////////////////////////            
            
function getParagraphInView(numparas,mar){
    var parainview=0;
    for(i=0;i<numparas;i++){
        if($('#para'+i).offset().top-mar<=$(window).scrollTop()){
            parainview=i;
        }
    }
    return parainview;
}
            
function stickydiv(){
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top){
        $('#info-graphic').addClass('sticky');
    }
    else{
        $('#info-graphic').removeClass('sticky');
    }
};

///////////////////////////////////////
////// Functions for compact view
///////////////////////////////////////

function showParagraph(id,numparas){
    for(i=0;i<numparas;i++){
        $('#para'+i).hide();
    }
    $('#endbuffer').hide();
    $('#para'+id).show();
}

///////////////////////////////////////
////// Transition infogrpahic functions
///////////////////////////////////////

function updateinfographic(temppara){
    if(currentpara!==temppara){
        highlighttimeline('#timeline',temppara);
        d3.select('#timelinedate'+currentpara).classed('hidden', true);
        d3.select('#timelinedate'+temppara).classed('hidden', false);
        $('#timelinedate'+temppara).removeClass('hidden');
        $('#barcharttitle').html('Confirmed Deaths and Cases - ' + data[temppara].date);
        if(!compact){
            $('#para'+currentpara).removeClass('highlightedpara');
            $('#para'+temppara).addClass('highlightedpara');
        }
        transitionBarChart('#barchart',data[temppara]);
        highlightmap(temppara);
        currentpara=temppara;
        
    }
}

function transitionBarChart(id,datain){
    var data = new Array();
    datain["DeathsandCases"].forEach(function(d) {
        data=data.concat([d['Deaths'],d['Cases']]);
    });
    var margin = {top: 20, right: 30, bottom: 20, left: 130},
    width = $(id).width() - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;    
    var barHeight = (height)/data.length-10;
    
    var x = d3.scale.linear()
<<<<<<< HEAD
        .domain([0,3500])
=======
        .domain([0,700])
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
        .range([0, width]);

    d3.select(id).selectAll("rect")
        .data(data).transition()
        .duration(1000)
        .attr("width", x)
        .attr("height", barHeight);

    d3.select(id).selectAll(".barlabel")
        .data(data).transition()
        .duration(1000)
        .attr("x", function(d) { return x(d)+5; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
}

/////////////////////////////////////////
////// Window resize events
////////////////////////////////////////

function resizedw(){
    if($(window).width()<768){compact = true;} else {compact = false;}
    if($(window).width()<currentwidth-20 || $(window).width()>currentwidth+20){
        currentwidth = $(window).width();
        $('#text').html('');
        $('#timeline').html('');
        $('#barchart').html('');
        $('#map').html('');
        $('#info-graphic').removeClass('sticky');
        generateParagraphs('#text',data);
        generateTimeline('#timeline',data);
        generateBarChart('#barchart',data[0]);
        generateMap('#map');
        var temppara=currentpara;
        currentpara=-1;
        updateinfographic(temppara);
        if(compact){
<<<<<<< HEAD
            showParagraph(temppara,34);
=======
            showParagraph(temppara,24);
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            $('#browse').show();
        } else {
            $('html, body').animate({
                scrollTop: $('#para'+temppara).offset().top
            }, 500);
            $('#browse').hide();
        }
        highlighttimeline('#timeline',temppara);
    }
}

//////////////////////////////
///// initialisation
/////////////////////////////

var compact = false;
var currentwidth=$(window).width();
var currentpara = -1;

if($(window).width()<768){compact = true;}            
generateParagraphs('#text',data);
generateTimeline('#timeline',data);
generateBarChart('#barchart',data[0]);
generateMap('#map');
updateinfographic(0);



$(window).scroll(function(){
    if(!compact){
        stickydiv();
<<<<<<< HEAD
        updateinfographic(getParagraphInView(34,220));
=======
        updateinfographic(getParagraphInView(24,220));
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
    }
});

if(compact){    
<<<<<<< HEAD
    showParagraph(0,34);
=======
    showParagraph(0,24);
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
} else {
    $('#browse').hide();
};

var doit;

window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 100);
};

$('#Next').on("click",function(){
<<<<<<< HEAD
    if(currentpara<34){
        showParagraph(currentpara+1,34);
=======
    if(currentpara<23){
        showParagraph(currentpara+1,24);
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
        updateinfographic(currentpara+1);
    }
});

$('#Previous').on("click",function(){
    if(currentpara>0){
<<<<<<< HEAD
        showParagraph(currentpara-1,34);
=======
        showParagraph(currentpara-1,24);
>>>>>>> parent of 52ec5a5... Merge pull request #6 from acrossthesound/master
        updateinfographic(currentpara-1);
    }
});
