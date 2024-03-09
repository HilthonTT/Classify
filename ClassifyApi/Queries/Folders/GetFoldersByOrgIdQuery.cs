using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Folders;

public class GetFoldersByOrgIdQuery : IRequest<List<Folder>>
{
    public string OrgId { get; set; }
    public string? Search { get; set; }

    public GetFoldersByOrgIdQuery(string orgId, string? search)
    {
        OrgId = orgId;
        Search = search;
    }
}
