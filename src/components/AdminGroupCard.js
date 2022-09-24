import React from 'react'

const AdminGroupCard = ({updateGroupName,group,users}) => {
  return (
    <>
      <div class="card text-white bg-primary mb-3 col-md-3 mx-1" style={{maxWidth: '14rem'}} onClick={()=>updateGroupName(group?.id)}>
    <div class="card-header">{group?.name}</div>
    <div class="card-body" style={{height:'120px', overflowY:'auto'}}>
      <h5 class="card-title">Users</h5>
     <ol>
     {users?.map((user)=>(user?.group_id?.find((s)=>s==group.id)) &&(
        <li>{user?.name}</li>
      ))}
     </ol>
    </div>
  </div>
    </>
  )
}

export default AdminGroupCard