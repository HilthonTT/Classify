using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Folders;
using MediatR;

namespace ClassifyApi.Handlers.Folders;

public class GetDeletedFoldersByOrgIdHandler : IRequestHandler<GetDeletedFoldersByOrgIdQuery, List<Folder>>
{
    private readonly IFolderData _folderData;

    public GetDeletedFoldersByOrgIdHandler(IFolderData folderData)
    {
        _folderData = folderData;
    }

    public async Task<List<Folder>> Handle(GetDeletedFoldersByOrgIdQuery request, CancellationToken cancellationToken)
    {
        List<Folder> folders = await _folderData.GetDeletedFoldersAsync(request.OrgId);

        return folders;
    }
}
