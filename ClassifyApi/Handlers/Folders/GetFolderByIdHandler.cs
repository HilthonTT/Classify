using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Folders;
using MediatR;

namespace ClassifyApi.Handlers.Folders;

public class GetFolderByIdHandler : IRequestHandler<GetFolderByIdQuery, Folder?>
{
    private readonly IFolderData _folderData;

    public GetFolderByIdHandler(IFolderData folderData)
    {
        _folderData = folderData;
    }

    public async Task<Folder?> Handle(GetFolderByIdQuery request, CancellationToken cancellationToken)
    {
        Folder? folder = await _folderData.GetFolderByIdAsync(request.Id);
        if (folder is null || folder.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        return folder;
    }
}
