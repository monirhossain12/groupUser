import React from 'react'

const UsersGroupCard = ({updateGroupName,group,users}) => {
  return (
    <>
    <div class="card text-white bg-primary mb-3 col-md-3 mx-2" style={{maxWidth: '14rem'}} onClick={()=>updateGroupName(group?.id)}>
  <div class="card-header">{group?.name}</div>
  <div class="card-body">
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

export default UsersGroupCard