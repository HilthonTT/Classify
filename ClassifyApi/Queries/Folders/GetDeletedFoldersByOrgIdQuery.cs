using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Folders;

public class GetDeletedFoldersByOrgIdQuery : IRequest<List<Folder>>
{
    public string OrgId { get; set; }

    public GetDeletedFoldersByOrgIdQuery(string orgId)
    {
        OrgId = orgId;
    }
}
