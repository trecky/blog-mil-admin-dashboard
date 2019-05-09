import {FuseLoadable} from '@fuse';

export const NotesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/notes/:id?/:labelHandle?/:labelId?',
            component: FuseLoadable({
                loader: () => import('./NotesApp')
            })
        }
    ]
};
