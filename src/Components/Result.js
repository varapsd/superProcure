import React from 'react'
import { Table } from 'react-bootstrap'
function Result(props){
    let mainArr = []
    let check = [{"contactNumbers":["22435157","30281570","8961369388"],"Pincodes":[700069,700072,700013,700001,700069],"_id":"60cf0870dfa0ac22a9fa5981","institutionName":"Beetle Nut","branchName":"Rohan","address":"Platform Number 9 3/11","city":"Pasadena","branchInchanrge":"Mr Roast Master","__v":0},{"contactNumbers":["65537730","9830456531"],"Pincodes":[700072,700013],"_id":"60cf0870dfa0ac22a9fa5983","institutionName":"Beetle Nut","branchName":"Central Perk","address":"Platform Number 9 3/13","city":"Pasadena","branchInchanrge":"Mr Charu Sharma","__v":0}];
    for(let i =0;i<props.branches.length;i++){
        let smlArr = [];
        smlArr.push(props.branches[i].branchName);
        smlArr.push(props.branches[i].branchInchanrge);
        let nums = ''
        for(let j = 0;j < props.branches[i].contactNumbers.length;j++){
            if(j==0){
                nums += props.branches[i].contactNumbers[j];
            }
            else{
                nums += '/ '+props.branches[i].contactNumbers[j]
            }
        }
        smlArr.push(nums);
        let addr = props.branches[i].city+' '+props.branches[i].address;
        smlArr.push(addr);
        mainArr.push(smlArr);
    }
   
    console.log(mainArr);
    /*
    if(props.branches.length > 0){
        console.log('yes')
        return(
            <div>
                <tr>{getTr(props.branches)}</tr>
            </div>
        ) 
    }
    */
   var errormsg = function(){
       console.log(props)
       if(props.isSearch && props.branches.length == 0){
            return(<div>Bad Bad Luck, No Donut for you!!</div>)
       }
   }
    return(
        <div>
            <h5>Results</h5>
            {errormsg()}
            { props.branches.length > 0 && 
            <Table striped bordered hover>
                {props.branches.map(branch =>{
                    console.log(branch);
                })}
                <thead>
                    <tr>
                    <th>Branch Name</th>
                    <th>Incharge</th>
                    <th>Contact Numbers</th>
                    <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                        {mainArr.map(branch=>(
                            <tr>
                            {branch.map(item=>(
                                <td>{item}</td>
                            ))}
                            </tr>
                        ))}
                </tbody>
            </Table>
        }
        </div>
    )
}

export default Result;